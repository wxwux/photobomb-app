<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function ($table) {
            $table->longText('description')->nullable();
            $table->string('avatar')->nullable();
            $table->string('background')->nullable();
            $table->string('vk')->nullable();
            $table->string('fb')->nullable();
            $table->string('tw')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function ($table) {
            $table->dropColumn('description');
            $table->dropColumn('avatar');
            $table->dropColumn('background');
            $table->dropColumn('vk');
            $table->dropColumn('fb');
            $table->dropColumn('tw');
        });
    }
}
