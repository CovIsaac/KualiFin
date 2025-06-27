<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Aval extends Model
{
    protected $table = 'avales';

    protected $fillable = [
        'cliente_id',
        'nombre_completo',
        'edad',
        'sexo',
        'estado_civil',
        'ine',
        'curp',
        'comprobante_domicilio',
    ];

    protected $casts = [
        // 'ine' => 'binary',
        // 'curp' => 'binary',
        // 'comprobante_domicilio' => 'binary',
    ];

    public function cliente(): BelongsTo
    {
        return $this->belongsTo(Cliente::class);
    }
}