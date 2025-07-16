<?php

namespace App\Http\Controllers;

use App\Models\DocumentoCliente;
use Illuminate\Http\Request;

class DocumentoClienteController extends Controller
{
    public function index() { return response()->json(DocumentoCliente::all()); }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'cliente_id' => 'required|exists:clientes,id',
            'credito_id' => 'nullable|exists:creditos,id',
            'tipo_doc' => 'required|string|max:20',
            'url_s3' => 'required|string|max:255',
            'nombre_arch' => 'required|string|max:150',
            'creado_en' => 'nullable|date',
        ]);
        $doc = DocumentoCliente::create($validated);
        return response()->json($doc, 201);
    }
    public function show($id) { return response()->json(DocumentoCliente::findOrFail($id)); }
    public function update(Request $request, $id)
    {
        $doc = DocumentoCliente::findOrFail($id);
        $validated = $request->validate([
            'cliente_id' => 'sometimes|exists:clientes,id',
            'tipo_doc' => 'sometimes|string|max:20',
            'url_s3' => 'sometimes|string|max:255',
            'nombre_arch' => 'sometimes|string|max:150',
            'creado_en' => 'nullable|date',
        ]);
        $doc->update($validated);
        return response()->json($doc);
    }
    public function destroy($id)
    {
        $doc = DocumentoCliente::findOrFail($id);
        $doc->delete();
        return response()->json(null, 204);
    }
}
