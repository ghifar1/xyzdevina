<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DealerController extends Controller
{
    public function dealer(Request $request)
    {
        $data = DB::table('annualy_reports')->select('map_' . ($request->entity ?? 'msme') . ' as label', DB::raw('SUM(idr_profit_end) as y'), DB::raw('SUM(usd_volume_end) as x'))
            ->where('tahun', $request->tahun ?? Carbon::now()->year)
            ->where('map_' . ($request->entity ?? 'msme'), "!=", null)
            ->groupBy('map_' . ($request->entity ?? 'msme'))
            ->get();

        return response()->json($data);
    }
}
