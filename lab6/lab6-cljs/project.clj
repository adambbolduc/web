(defproject lab6-cljs "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}

  ;;CLJ AND CLJS Source code path
  :source-paths ["src/clj" "src/cljs"]
  :dependencies [[org.clojure/clojure "1.7.0"]
                 [org.clojure/clojurescript "0.0-2069"]
                 [ring "1.4.0"]
                 [hiccup "1.0.5"]
                 [jayq "2.5.4"]
                 [hiccups "0.3.0"]]

  ;; lein-cljsbuild plugin to build a CLJS project
  :plugins [[lein-cljsbuild "1.0.0"]]

  :ring {:handler lab6-cljs.core/handler}

  ;; cljsbuild options configuration
  :cljsbuild {:builds
            [{;; CLJS source code path
              :source-paths ["src/cljs"]

              ;; Google Closure (CLS) options configuration
              :compiler {;; CLS generated JS script filename
                         :output-to "resources/public/js/main.js"

                         ;; minimal JS optimization directive
                         :optimizations :whitespace

                         ;; generated JS code prettyfication
                         :pretty-print true}}]}
   :main lab6-cljs.core)
