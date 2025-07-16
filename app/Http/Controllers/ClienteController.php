<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;
use Faker\Factory as Faker;

class ClienteController extends Controller
{
    // Mostrar todos los clientes
    public function index()
    {
        return response()->json(Cliente::all());
    }

    // Crear un nuevo cliente
    public function store(Request $request)
    {
        // Validación del cliente
        $validatedCliente = $request->validate([
            'nombre' => 'required|string|max:100',
            'apellido_p' => 'required|string|max:100',
            'apellido_m' => 'required|string|max:100',
            'curp' => 'required|string|max:18|unique:clientes,curp',
            'fecha_nac' => 'required|date',
            'sexo' => 'required|string|max:10',
            'estado_civil' => 'required|string|max:20',
            'activo' => 'required|boolean',
        ]);

        // Validación de documentos (archivos)
        $validatedDocs = $request->validate([
            'documentos.ine' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'documentos.curp' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'documentos.comprobante' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ]);

        // Crear cliente
        $cliente = Cliente::create($validatedCliente);

        // Descomenta para usar documentos reales subidos
        /*
        foreach (['ine', 'curp', 'comprobante'] as $tipo) {
            if ($request->hasFile("documentos.$tipo")) {
                $file = $request->file("documentos.$tipo");
                $path = $file->store('clientes_docs'); // O almacenamiento S3 si usas

                $cliente->documentos()->create([
                    'tipo_doc' => $tipo,
                    'url_s3' => $path,
                    'nombre_arch' => $file->getClientOriginalName(),
                ]);
            }
        }
        */

        // Código para pruebas con documentos Faker
        $faker = Faker::create();

        $documentosFake = [
            ['tipo_doc' => 'ine', 'url_s3' => 'faker/path/ine_' . $faker->uuid . '.pdf', 'nombre_arch' => 'ine_fake.pdf'],
            ['tipo_doc' => 'curp', 'url_s3' => 'faker/path/curp_' . $faker->uuid . '.pdf', 'nombre_arch' => 'curp_fake.pdf'],
            ['tipo_doc' => 'comprobante', 'url_s3' => 'faker/path/comprobante_' . $faker->uuid . '.pdf', 'nombre_arch' => 'comprobante_fake.pdf'],
        ];

        foreach ($documentosFake as $doc) {
            $cliente->documentos()->create($doc);
        }

        return redirect()->back()->with('success', 'Cliente y documentos (Faker) guardados correctamente');
    }

    // Mostrar un cliente específico
    public function show($id)
    {
        $cliente = Cliente::findOrFail($id);
        return response()->json($cliente);
    }

    // Actualizar un cliente
    public function update(Request $request, $id)
    {
        $cliente = Cliente::findOrFail($id);
        $validated = $request->validate([
            'nombre' => 'sometimes|required|string|max:100',
            'apellido_p' => 'sometimes|required|string|max:100',
            'apellido_m' => 'sometimes|required|string|max:100',
            'curp' => 'sometimes|required|string|max:18|unique:clientes,curp,' . $id,
            'fecha_nac' => 'sometimes|required|date',
            'sexo' => 'sometimes|required|string|max:10',
            'activo' => 'sometimes|required|boolean',
        ]);
        $cliente->update($validated);
        return response()->json($cliente);
    }

    // Eliminar un cliente
    public function destroy($id)
    {
        $cliente = Cliente::findOrFail($id);
        $cliente->delete();
        return response()->json(null, 204);
    }
}
