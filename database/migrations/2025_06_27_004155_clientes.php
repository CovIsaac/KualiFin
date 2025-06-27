<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('clientes', function (Blueprint $table) {
            $table->id();

            $table->string('nombre_completo', 100);
            $table->integer('edad');

            // Sexo como enum simulado con check (SQLite no tiene enum nativo)
            $table->string('sexo')->check("sexo IN ('Masculino', 'Femenino')");

            // Estado civil como enum simulado con check
            $table->string('estado_civil')->check("estado_civil IN ('soltero', 'casado', 'union libre', 'viudo', 'divorciado')");

            // Archivos como BLOBs (almacenan contenido binario como PDF o imagen)
            $table->binary('ine');
            $table->binary('curp');
            $table->binary('comprobante_domicilio');

            $table->timestamps(); // created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clientes');
    }
};
