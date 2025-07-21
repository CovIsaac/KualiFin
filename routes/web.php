<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DocumentoClienteController; // ← importa tu controlador
use Illuminate\Foundation\Application;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', fn() => redirect('/login'));

Route::middleware(['auth','verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))
         ->name('dashboard');

    // Perfil de usuario
    Route::get('/profile',   [ProfileController::class, 'edit'])
         ->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])
         ->name('profile.update');
    Route::delete('/profile',[ProfileController::class, 'destroy'])
         ->name('profile.destroy');

    // Clientes
    Route::get('/nuevoCliente',           [ClienteController::class, 'create'])
         ->name('nuevoCliente');
    Route::post('/nuevoCliente/store',    [ClienteController::class, 'store'])
         ->name('client.store');

    // Documentos de cliente (API RESTful)
    Route::apiResource('documentos', DocumentoClienteController::class);

    // Otras páginas Inertia
    Route::get('/nuevoCredito',    fn() => Inertia::render('solicitud'))
         ->name('solicitud');
    Route::get('/recreditoCliente',fn() => Inertia::render('recreditoClientes'))
         ->name('recreditoClientes');
    Route::get('/reportes',        fn() => Inertia::render('reportes'))
         ->name('reportes');
    Route::get('/panelRevision',   fn() => Inertia::render('PanelRevision'))
         ->name('panelRevision');
    Route::get('/panelAdministrativo', fn() => Inertia::render('AdminDashboard'))
         ->name('AdminDashboard');

    // Registro de empleados
    Route::get('/registrarEmpleado',    fn() => Inertia::render('Users/RegisterUserForm'))
         ->name('register.form');
    Route::post('/registrarEmpleado',   [UserController::class, 'store'])
         ->name('register.user');
});

// Auth routes (login, register, etc.)
require __DIR__.'/auth.php';
