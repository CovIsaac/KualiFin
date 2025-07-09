<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('clientes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nombre', 100);
            $table->string('apellido_p', 100);
            $table->string('apellido_m', 100);
            $table->string('curp', 18)->unique();
            $table->date('fecha_nac');
            $table->string('sexo', 10);
            $table->timestamp('creado_en')->nullable();
            $table->timestamp('actualizado_en')->nullable();
            $table->boolean('activo');
        });
    }

    public function down(): void {
        Schema::dropIfExists('clientes');
    }
};
