<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController;

use App\Http\Controllers\CreditoController;
use App\Http\Controllers\DireccionController;
use App\Http\Controllers\InformacionFamiliarController;
use App\Http\Controllers\OcupacionController;
use App\Http\Controllers\IngresoAdicionalController;
use App\Http\Controllers\AvalController;
use App\Http\Controllers\GarantiaController;
use App\Http\Controllers\DocumentoClienteController;
use App\Http\Controllers\DocumentoAvalController;
use App\Http\Controllers\EstatusHistorialController;
use App\Http\Controllers\PagoController;
use App\Http\Controllers\ContratoController;

Route::apiResource('clientes', ClienteController::class);
Route::apiResource('creditos', CreditoController::class);
Route::apiResource('direcciones', DireccionController::class);
Route::apiResource('informacion-familiares', InformacionFamiliarController::class);
Route::apiResource('ocupaciones', OcupacionController::class);
Route::apiResource('ingresos-adicionales', IngresoAdicionalController::class);
Route::apiResource('avales', AvalController::class);
Route::apiResource('garantias', GarantiaController::class);
Route::apiResource('documentos-clientes', DocumentoClienteController::class);
Route::apiResource('documentos-avales', DocumentoAvalController::class);
Route::apiResource('estatus-historial', EstatusHistorialController::class);
Route::apiResource('pagos', PagoController::class);
Route::apiResource('contratos', ContratoController::class);
