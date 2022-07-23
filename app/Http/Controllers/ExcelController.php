<?php

namespace App\Http\Controllers;

use App\Imports\AnnualyReportsImport;
use App\Models\AnnualyReport;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;

class ExcelController extends Controller
{
    public function upload(Request $request)
    {

        $validate = Validator::make($request->all(), [
            'excel' => 'required',
            'tahun' => 'required',
        ]);

        if ($validate->fails()) {
            return response()->json($validate->errors(), 400);
        }
        try {
            $annualReport = AnnualyReport::where('tahun', $request->tahun)->delete();
            Excel::import(new AnnualyReportsImport, $request->file('excel'));
        } catch (Exception $e) {
            return response()->json([ "error" => "invalid file", "exception" => $e], 400);
        }

        return response()->json('success', 200);
    }

    public function get()
    {
        $data = DB::table('annualy_reports')->select('rate', 'tahun', DB::raw('count(*) as total'))->groupBy('tahun', 'rate')->get();

        return response()->json($data, 200);
    }
}
