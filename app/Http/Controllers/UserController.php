<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function store(Request $request)
    {


        $request->validate([
            'name'                  => 'required|string|max:255',
            'email'                 => 'required|email|unique:users,email',
            'password'              => 'required|min:8|confirmed',
            'rol'                   => 'required',
            'telefono'              => 'nullable|string|max:20',
            
        ],[
        'email.unique' => 'Este correo ya está en uso.', 
    ]);

       

        User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'rol'      => $request->rol,
            'telefono' => $request->telefono,
            'email_verified_at' => now(),
            
        ]);

        

        return redirect()->back()->with('success', 'Empleado creado correctamente');
    }
}
