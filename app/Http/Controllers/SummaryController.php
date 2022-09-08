<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SummaryController extends Controller
{
    public function volume(Request $request)
    {
        $data = DB::table('annualy_reports')->select('sales_code as label', DB::raw('SUM(usd_volume_end) as total'))
            ->where('sales_code', '!=', '')
            ->where('sales_code', '!=', '123')
            ->where('sales_code', '!=', '1')
            ->where('sales_code', '!=', 'BIZ')
            ->where('tahun', $request->tahun ?? Carbon::now()->year)
            ->groupBy('sales_code')
            ->orderBy('total', 'desc')
            ->limit(10)
            ->get();

        return response()->json($data);
    }

    public function profit(Request $request)
    {
        $data = DB::table('annualy_reports')->select('sales_code as label', DB::raw('SUM(idr_profit_end) as total'))
            ->where('sales_code', '!=', '')
            ->where('sales_code', '!=', '123')
            ->where('sales_code', '!=', '1')
            ->where('sales_code', '!=', 'BIZ')
            ->where('tahun', $request->tahun ?? Carbon::now()->year)
            ->groupBy('sales_code')
            ->orderBy('total', 'desc')
            ->limit(10)
            ->get();

        return response()->json($data);
    }

    public function topTenClientProfit(Request $request)
    {
        $data = DB::table('annualy_reports')->select('rmcif as label', DB::raw('SUM(idr_profit_end) as total'))
            ->where('rmcif', '!=', 'E-CHANNEL - CIMB CLICKS')
            ->where('rmcif', '!=', 'E-CHANNEL - GO MOBILE')
            ->where('tahun', $request->tahun ?? Carbon::now()->year)
            ->groupBy('rmcif')
            ->orderBy('total', 'desc')
            ->limit(10)
            ->get();

        return response()->json($data);
    }

    public function topTenClientVolume(Request $request)
    {
        $data = DB::table('annualy_reports')->select('rmcif as label', DB::raw('SUM(usd_volume_end) as total'))
            ->where('tahun', $request->tahun ?? Carbon::now()->year)
            ->groupBy('rmcif')
            ->orderBy('total', 'desc')
            ->limit(10)
            ->get();

        return response()->json($data);
    }
}
