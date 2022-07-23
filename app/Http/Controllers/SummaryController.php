<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SummaryController extends Controller
{
    public function volume()
    {
        $data = DB::table('annualy_reports')->select('sales_code as label', DB::raw('SUM(usd_volume_end) as total'))
        ->where('sales_code', '!=', '')
        ->where('sales_code', '!=', '123')
        ->groupBy('sales_code')
        ->orderBy('total', 'desc')
        ->limit(10)
        ->get();

        return response()->json($data);
    }

    public function profit()
    {
        $data = DB::table('annualy_reports')->select('sales_code as label', DB::raw('SUM(idr_profit_end) as total'))
        ->where('sales_code', '!=', '')
        ->where('sales_code', '!=', '123')
        ->groupBy('sales_code')
        ->orderBy('total', 'desc')
        ->limit(10)
        ->get();

        return response()->json($data);
    }

    public function topTenClientProfit()
    {
        $data = DB::table('annualy_reports')->select('rmcif as label', DB::raw('SUM(idr_profit_end) as total'))
        ->groupBy('rmcif')
        ->orderBy('total', 'desc')
        ->limit(10)
        ->get();

        return response()->json($data);
    }

    public function topTenClientVolume()
    {
        $data = DB::table('annualy_reports')->select('rmcif as label', DB::raw('SUM(usd_volume_end) as total'))
        ->groupBy('rmcif')
        ->orderBy('total', 'desc')
        ->limit(10)
        ->get();

        return response()->json($data);
    }

}
