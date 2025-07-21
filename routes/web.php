<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ClienteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return redirect('/login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::apiResource('documentos', DocumentoClienteController::class);


Route::middleware(['auth', 'verified'])->group(function () {
    // Perfil de usuario
    Route::get('/profile', [ProfileController::class, 'edit'])
         ->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])
         ->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])
         ->name('profile.destroy');

    // Nuevo cliente (Inertia + React)
    Route::get('/nuevoCliente', [ClienteController::class, 'create'])
         ->name('nuevoCliente');
    Route::post('/nuevoCliente/store', [ClienteController::class, 'store'])
         ->name('client.store');

    // Otras páginas Inertia protegidas
    Route::get('/nuevoCredito', function () {
        return Inertia::render('solicitud');
    })->name('solicitud');

    Route::get('/recreditoCliente', function () {
        return Inertia::render('recreditoClientes');
    })->name('recreditoClientes');

    Route::get('/reportes', function () {
        return Inertia::render('reportes');
    })->name('reportes');

    Route::get('/panelRevision', function () {
        return Inertia::render('PanelRevision');
    })->name('panelRevision');

    // Registro de empleados
    Route::get('/registrarEmpleado', function () {
        return Inertia::render('Users/RegisterUserForm');
    })->name('register.form');
    Route::post('/registrarEmpleado', [UserController::class, 'store'])
         ->name('register.user');

    Route::get('/panelAdministrativo', function () {
        return Inertia::render('AdminDashboard');
    })->name('AdminDashboard');
});

require __DIR__.'/auth.php';
