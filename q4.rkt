#lang racket
(provide (all-defined-out))

;; Signature: shift-left(ls)
;; Type: [ List(T) -> List(T) ]
;; Purpose: takes a list as an argument and shifts the list one time to the left.
(define shift-left
  (lambda (ls)
    (if (empty? ls)
    '()
    (append (cdr ls) (list (first ls ))))))
    

;; Signature: shift-k-left(ls k)
;; Type: [ List(T) -> List(T) ]
;; Purpose: takes a list and a number k ≥ 0 and "shift-left" the list k times.
(define shift-k-left
  (lambda (ls k)
    (cond ((equal? k 0) ls)
          ((empty? ls) ls)
          (else  (shift-k-left (shift-left ls) (- k 1))))))

;; Signature: shift-right(ls)
;; Type: [ List(T) -> List(T) ]
;; Purpose: takes a list as an argument and evaluates the list that is its’ shift-right by one place.
(define shift-right
  (lambda (ls)
    (shift-k-left ls (- (length ls) 1))))
 
    

;; Signature: combine(ls1 ls2)
;; Type: [ List*List -> List ]
;; Purpose: takes two lists and combines them in to one new list in an alternating manner starting from the first one.
(define combine
  (lambda (ls1 ls2)
    (cond ((empty? ls1) ls2)
          ((empty? ls2) ls1)
          (else (append (cons (first ls1) `()) (cons (first ls2) (combine(cdr ls1)(cdr ls2))))))))

;; Signature: sum-tree(tree)
;; Type: [((List(Number) union Number) -> Number]
;; Purpose: receives a tree which has data values in his nodes which are all non-negetive numbers and return the sum of nodes values.
(define sum-tree
  (lambda (tree)
    (cond ((number? tree) tree)  ;; if it's a number, return it. else "reduce" it using foldl     
          ((empty? tree) 0)           
          (else (foldl + 0 (map (lambda (x) (sum-tree x)) tree))))))

;; Signature: inverse-tree (tree)
;; Type: [((List(Number| Boolean) | Number | Boolean) -> ((List(Number| Boolean) | Number | Boolean)]
;; Purpose: receives a tree which has number and boolean values, and inverses each node's value.
  (lambda (tree)
    (cond ((empty? tree) `())
          ((number? tree)  (* -1 tree))
          ((boolean? tree) (not tree))
          (else (map (lambda (x) (inverse-tree x)) tree)))))