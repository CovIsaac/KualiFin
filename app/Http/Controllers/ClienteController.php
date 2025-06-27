<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;

class ClienteController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'edad' => 'required|integer|min:18|max:100',
            'sexo' => 'required|in:masculino,femenino',
            'estado_civil' => 'required|in:soltero,casado,union_libre,viudo,divorciado',
            'ine' => 'required|file|mimes:pdf,jpg,jpeg,png',
            'curp' => 'required|file|mimes:pdf,jpg,jpeg,png',
            'comprobante' => 'required|file|mimes:pdf,jpg,jpeg,png',
        ]);

        $cliente = new Cliente();
        $cliente->nombre_completo = $validated['nombre'];
        $cliente->edad = $validated['edad'];
        $cliente->sexo = $validated['sexo'];
        $cliente->estado_civil = $validated['estado_civil'];

        $cliente->ine = file_get_contents($request->file('ine')->getRealPath());
        $cliente->curp = file_get_contents($request->file('curp')->getRealPath());
        $cliente->comprobante_domicilio = file_get_contents($request->file('comprobante')->getRealPath());

        $cliente->save();

        return back()->with('success', 'Cliente registrado correctamente');
    }
}
