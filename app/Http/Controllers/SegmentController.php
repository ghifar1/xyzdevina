<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SegmentController extends Controller
{
    public function segment(Request $request)
    {
        $data = DB::table('annualy_reports')->select('segm as label', DB::raw('SUM(idr_profit_end) as y'), DB::raw('SUM(usd_volume_end) as x'))
            ->where('tahun', $request->tahun ?? Carbon::now()->year)
            ->groupBy('segm')
            ->orderBy('x', 'desc')
            ->orderBy('y', 'desc')
            ->get();

        return response()->json($data);
    }

    public function segmentGrowth(Request $request)
    {
        $data = DB::table('annualy_reports')->select('segm as segment', 'bulan', DB::raw('SUM(usd_volume_end) as volume'))
            ->where('tahun', $request->tahun ?? Carbon::now()->year)
            ->groupBy('bulan', 'segment')
            ->orderBy('segment')
            ->get();

        $labels = DB::table('annualy_reports')->select('segm')->groupBy('segm')->get();

        return response()->json(['labels' => $labels, 'data' => $data]);
    }
}
