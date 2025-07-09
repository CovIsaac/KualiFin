<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;

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
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'apellido_p' => 'required|string|max:100',
            'apellido_m' => 'required|string|max:100',
            'curp' => 'required|string|max:18|unique:clientes,curp',
            'fecha_nac' => 'required|date',
            'sexo' => 'required|string|max:10',
            'activo' => 'required|boolean',
        ]);
        $cliente = Cliente::create($validated);
        return response()->json($cliente, 201);
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
