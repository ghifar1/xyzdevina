<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AreaController extends Controller
{
    public function segment()
    {
        $data = DB::table('annualy_reports')->select('segm as label', DB::raw('SUM(idr_profit_end) as y'), DB::raw('SUM(usd_volume_end) as x'))
            ->groupBy('segm')
            ->orderBy('x', 'desc')
            ->orderBy('y', 'desc')
            ->get();

        return response()->json($data);
    }

    public function segmentGrowth()
    {
        $data = DB::table('annualy_reports')->select('segm as segment', 'bulan', DB::raw('SUM(usd_volume_end) as volume'))
            ->groupBy('bulan', 'segment')
            ->orderBy('segment')
            ->get();

        $labels = DB::table('annualy_reports')->select('segm')->groupBy('segm')->get();

        return response()->json(['labels' => $labels, 'data' => $data]);
    }
}
