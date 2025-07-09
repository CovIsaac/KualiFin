<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $table = 'clientes';

    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';

    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'apellido_p',
        'apellido_m',
        'curp',
        'fecha_nac',
        'sexo',
        'creado_en',
        'actualizado_en',
        'activo',
    ];
}
