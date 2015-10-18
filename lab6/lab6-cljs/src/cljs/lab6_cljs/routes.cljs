(ns lab6-cljs.routes
  (:use [jayq.core :only [$]])
  (:require [jayq.core :as jq]))

(def MyRouter
  (.extend Backbone.Router
    (js-obj
      "routes"
      (js-obj
        "" "home"
        "tasks" "tasks"))))

(def myRouter (MyRouter.))

(.on myRouter "route:home"
  (fn []
    (js/alert "Home")))

(.on myRouter "route:tasks"
  (fn []
    (js/alert "Tasks")))
