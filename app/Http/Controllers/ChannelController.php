<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChannelController extends Controller
{
    public function groupingProduct(Request $request)
    {

        $data = DB::table('annualy_reports')->select('grouping_product as label', DB::raw('SUM(idr_profit_end) as y'), DB::raw('SUM(usd_volume_end) as x'))
            ->where('tahun', $request->tahun ?? Carbon::now()->year)
            ->where('grouping_product', "!=", null)
            ->groupBy('grouping_product')
            ->get();
        return response()->json($data);
    }

    public function eChannels(Request $request)
    {

        $data = DB::table('annualy_reports')->select('e_channels as label', DB::raw('SUM(idr_profit_end) as y'), DB::raw('SUM(usd_volume_end) as x'))
            ->where('tahun', $request->tahun ?? Carbon::now()->year)
            ->where('e_channels', "!=", null)
            ->groupBy('e_channels')
            ->get();
        return response()->json($data);
    }
}
