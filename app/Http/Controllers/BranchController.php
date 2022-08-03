<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BranchController extends Controller
{
    public function branch(Request $request)
    {
        $query = DB::table('annualy_reports');
        $query->select('segm', 'main_branch_name as label', DB::raw('SUM(idr_profit_end) as y'), DB::raw('SUM(usd_volume_end) as x'));
        $query->where('tahun', $request->tahun ?? Carbon::now()->year);
        if ($request->filter) {
            $query->whereIn('segm', $request->filter);
        }
        $query->where('main_branch_name', "!=", null);
        $query->groupBy('segm', 'main_branch_name');

        $segment = DB::table('annualy_reports')->select('segm', DB::raw('SUM(segm) as total'))
            ->where('tahun', $request->tahun ?? Carbon::now()->year)
            ->groupBy('segm')
            ->get();

        $data = [
            'data' => $query->get(),
            'segment' => $segment,
        ];

        // $data = DB::table('annualy_reports')->select('segm', 'main_branch_name as label', DB::raw('SUM(idr_profit_end) as y'), DB::raw('SUM(usd_volume_end) as x'))
        //     ->where('tahun', $request->tahun ?? Carbon::now()->year)
        //     ->where('main_branch_name', "!=", null)
        //     ->groupBy('segm', 'main_branch_name')
        //     ->get();

        return response()->json($data);
    }
}
