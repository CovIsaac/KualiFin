<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;
use App\Models\Aval;

class ClienteController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            // Datos del cliente
            'cliente_nombre' => 'required|string|max:100',
            'cliente_edad' => 'required|integer|min:18|max:100',
            'cliente_sexo' => 'required|in:masculino,femenino',
            'cliente_estado_civil' => 'required|in:soltero,casado,union_libre,viudo,divorciado',
            'cliente_ine' => 'required|file|mimes:pdf,jpg,jpeg,png',
            'cliente_curp' => 'required|file|mimes:pdf,jpg,jpeg,png',
            'cliente_comprobante' => 'required|file|mimes:pdf,jpg,jpeg,png',
            
            // Datos del aval
            'aval_nombre' => 'required|string|max:100',
            'aval_edad' => 'required|integer|min:18|max:100',
            'aval_sexo' => 'required|in:masculino,femenino',
            'aval_estado_civil' => 'required|in:soltero,casado,union_libre,viudo,divorciado',
            'aval_ine' => 'required|file|mimes:pdf,jpg,jpeg,png',
            'aval_curp' => 'required|file|mimes:pdf,jpg,jpeg,png',
            'aval_comprobante' => 'required|file|mimes:pdf,jpg,jpeg,png',
        ]);

        // Crear el cliente
        $cliente = new Cliente();
        $cliente->nombre_completo = $validated['cliente_nombre'];
        $cliente->edad = $validated['cliente_edad'];
        $cliente->sexo = $validated['cliente_sexo'];
        $cliente->estado_civil = $validated['cliente_estado_civil'];

        $cliente->ine = file_get_contents($request->file('cliente_ine')->getRealPath());
        $cliente->curp = file_get_contents($request->file('cliente_curp')->getRealPath());
        $cliente->comprobante_domicilio = file_get_contents($request->file('cliente_comprobante')->getRealPath());

        $cliente->save();

        // Crear el aval
        $aval = new Aval();
        $aval->cliente_id = $cliente->id;
        $aval->nombre_completo = $validated['aval_nombre'];
        $aval->edad = $validated['aval_edad'];
        $aval->sexo = $validated['aval_sexo'];
        $aval->estado_civil = $validated['aval_estado_civil'];

        $aval->ine = file_get_contents($request->file('aval_ine')->getRealPath());
        $aval->curp = file_get_contents($request->file('aval_curp')->getRealPath());
        $aval->comprobante_domicilio = file_get_contents($request->file('aval_comprobante')->getRealPath());

        $aval->save();

        return back()->with('success', 'Cliente y aval registrados correctamente');
    }
}