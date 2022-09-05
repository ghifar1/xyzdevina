<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AreaController extends Controller
{
    public function volume(Request $request)
    {
        $data = DB::table('annualy_reports')->select('snd_head', DB::raw('SUM(usd_volume_end) as volume'))
            ->where('tahun', $request->tahun ?? Carbon::now()->year)
            ->groupBy('snd_head')
            ->orderBy('snd_head')
            ->get();
        return response()->json($data);
    }

    public function areaSnd(Request $request)
    {
        $data = DB::table('annualy_reports')->select('snd_area', DB::raw('SUM(idr_profit_end) as profit'), DB::raw('SUM(usd_volume_end) as volume'))
            ->where('tahun', $request->tahun ?? Carbon::now()->year)
            ->groupBy('snd_area',)
            ->orderBy('snd_area')
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
