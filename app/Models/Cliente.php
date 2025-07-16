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

    const CREATED_AT = 'creado_en';
    const UPDATED_AT = 'actualizado_en';
    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'apellido_p',
        'apellido_m',
        'curp',
        'fecha_nac',
        'sexo',
        'estado_civil',
        'creado_en',
        'actualizado_en',
        'activo',
    ];

    public function documentos(){ return $this->hasMany(DocumentoCliente::class, 'cliente_id', 'id');}
}
