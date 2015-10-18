(ns lab6-cljs.event
  (:use [jayq.core :only [$]])
  (:require [jayq.core :as jq]))


(def task-event {})

(.extend js/_ task-event Backbone.Events)

(.on task-event "alert"
  (fn [msg] (js/alert msg)))

(jq/bind ($ "#clickable-event") :click
  (fn [e] (.trigger task-event "alert" "Hello Backbone!")))

(jq/bind ($ "#clickable-color") :click
         (fn [e] (.promptColor my-model)))
