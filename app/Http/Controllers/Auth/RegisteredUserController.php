<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users,email',
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
        'rol' => 'required|string',
        'telefono' => 'required|string|max:10',
    ]);

    $user = User::create([
        'name' => $validated['name'],
        'email' => $validated['email'],
        'rol' => $validated['rol'],
        'telefono' => $validated['telefono'],
        'password' => Hash::make($validated['password']),
    ]);

    // Puedes lanzar el evento si lo necesitas
    event(new Registered($user));

    // Redirige (aunque sea a la misma página), para que Inertia dispare onSuccess()
    return redirect()->back()->with('success', 'Empleado registrado');
}

}
