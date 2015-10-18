(ns lab6-cljs.core
  (:require [ring.adapter.jetty :as jetty]
            [ring.middleware.resource :as resources]
            [ring.middleware.reload :as reload])
  (:use     [hiccup.core]
            [hiccup.form]
            [hiccup.page]))


(defn task-list-template
  []
  [:div {:class "container-fluid"}
    [:table {:class "table table-striped col-xs-12"}
      [:thead
        [:tr
          [:th {:class "col-xs-3 col-sm-2"} "ID"]
          [:th {:class "col-xs-3 col-sm-4"} "Task Description"]]]
      [:tbody]
      [:tfoot
        [:tr
          [:td {:class "col-xs-6"} [:input {:type "text" :id "task" :class "form-control" :placeholder "New Task Description"}]]
          [:td {:class "col-xs-6"} [:input {:type "submit" :id "add" :class "btn btn-success form-control" :value "Add"}]]]]]])


(defn render-index
  []
    (html5
    {:lang "en"}
    [:head (include-css "/node_modules/bootstrap/dist/css/bootstrap.min.css")
      [:title "Tasks"]
      [:meta {:charset "utf-8"}]]
    [:body  (task-list-template)
            (include-js
              "http://code.jquery.com/jquery-1.7.1.min.js"
              "node_modules/underscore/underscore.js"
              "node_modules/backbone/backbone.js"
              "js/main.js")]))

(defn handler
  [request]
  { :status 200
    :headers {"Content-Type" "text/html"}
    :body (render-index)
  })

(def app
  (-> handler
    (resources/wrap-resource "public")
    (reload/wrap-reload)))

(defn -main [& args]
  (jetty/run-jetty app {:port 3000}))
