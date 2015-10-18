(ns lab6-cljs.view
  (:use [jayq.core :only [$]])
  (:require-macros [hiccups.core :as hps :refer [html]])
  (:require [jayq.core :as jq]
            [hiccups.runtime :as hiccupsrt]))

(enable-console-print!)


(def MyModel
  (.extend Backbone.Model
    (js-obj
        "urlRoot" "http://localhost:5000/tasks"
        "defaults" (js-obj
          "id" "10239102391"
          "task" "Voici la tache merde"))))


(def MyCollection
  (.extend Backbone.Collection
    (js-obj
      "url" "http://localhost:5000/tasks"
      "model" MyModel
      "parse" (fn [data]
        (aget data "tasks")))))


(defn task-template
  [data]
    (hps/html [:tr
                [:td (:id data)]
                [:td (:task data)]
                [:td [:button {:class "btn btn-success form-control"} "Show"]]
                [:td [:button {:class "btn btn-warning form-control"} "Edit"]]
                [:td [:button {:class "btn btn-danger form-control"} "Delete"]]]))

(defn caliss
  [caliss]
    (println caliss))

(def TaskView
  (.extend Backbone.View
    (js-obj
      "initialize" (fn [] (this-as this (.listenTo this (aget this "collection") "reset" (.render this))))
      "el" "tbody"
       "render" (fn []
         (this-as this
              (.collection.each this (println "pouet") ))))))


(def taskView (TaskView. (js-obj "collection" (MyCollection.))))

(.render taskView)
