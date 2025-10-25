<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 400);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        $user = auth()->user();

        $response = response()->json([
            'message' => 'Login successful',
            'user' => $user
       ]);

        $response->cookie(
            'jwt_token',
            $token,
            60 * 24,           // 1 day
            '/',
            null,
            true,              // Secure
            true,              // HttpOnly
            false,
            'strict'          // SameSite
        );

        $response->cookie(
            'role',
            $user->role,
            config('jwt.ttl'),
            '/',
            null,
            true,
            true,
            false,
            'strict'
        );
        return $response;
    }

    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());
        return response()->json([
                'message' => 'Successfully logged out'
            ])->cookie(
                'jwt_token',
                null,
                -1,                // Negative expiration to delete cookie
                '/',
                null,
                true,
                true,
                false,
                'strict'
            );
    }
}