<?php namespace MyConnection;
    include_once 'DbConnection.php';

    class DatabaseFactory {
    private static $connection;

    public static function getDatabase(){

        if (self::$connection == null) {
            $url = "fdb24.awardspace.net";
            $user = "3328198_krash46";
            $passw = "JessicaFarias123456%";
            $db = "3328198_krash46";
            self::$connection = new Database($url, $user, $passw, $db);
        }
        return self::$connection;
    }

} 
?>