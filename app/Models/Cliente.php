<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $table = 'clientes'; // en caso de que quieras asegurarlo

    protected $fillable = [
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
}
