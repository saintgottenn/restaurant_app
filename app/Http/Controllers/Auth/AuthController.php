<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth.jwt', ['except' => ['register', 'login']]);
    }

    public function register(Request $request) 
    {
        $request->validate([
            'name' => 'required|string',
            'phone_number' => 'required|digits_between:10,20',
            'password' => 'required|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'phone_number' => $request->phone_number,
            'password' => Hash::make($request->password),
        ]);   

        $token = JWTAuth::fromUser($user);

        return response()->json(['token' => $token], 201);
    }


    public function login(Request $request)
    {
        $creds = $request->validate([
            'phone_number' => 'required|digits_between:10,20',
            'password' => 'required',
        ]);

        if (! $token = auth()->attempt($creds)) {
            return response()->json(['error' => 'Пользователь не найден. Проверьте введенные вами данные'], 401);
        }

        return response()->json(['token' => $token]);
    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Вы успешно вышли из аккаунта.']);
    }

    public function me()
    {
        return response()->json(auth()->user());
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
        ]);
    }
}
