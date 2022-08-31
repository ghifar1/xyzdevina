<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{

    public function __construct()
    {
        $this->middleware('api');
    }

    public function index()
    {
        return response()->json(auth('api')->user());
    }

    public function addUser(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required',
            'divisi' => 'required',
            'password' => 'required',
            'confirm_password' => 'required',
        ]);

        if($validate->fails()) {
            return response()->json($validate->errors(), 400);
        }

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;

        if($request->password != $request->confirm_password)
        {
            return response()->json("password not same", 400);
        }

        $user->password= Hash::make($request->password);
        $user->divisi = $request->divisi;
        $user->image = "";
        $user->save();

        return response()->json("OK");
    }

    public function editProfile(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required',
            'divisi' => 'required',
        ]);

        if($validate->fails()) {
            return response()->json($validate->errors());
        }

        $user = User::find(auth('api')->user()->id);
        $user->email = $request->email;
        $user->name = $request->name;
        if($request->password)
        {
            $user->password = Hash::make($request->password);
        }
        $user->save();
        return response()->json("OK");
    }

    public function getAll ()
    {
        $all = User::all();
        return response()->json($all);
    }
}
