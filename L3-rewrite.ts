import { filter, map, reduce, zip } from "ramda";
import { first, isArray, isBoolean, isEmpty, isNumber, isString, rest, second, isLetStarExp, makeLetExp, makeLetStarExp, LetStarExp, LetExp, makeProgram, makeDefineExp, isVarDecl, makeBinding, isBinding, isAtomicExp, Binding } from "./L3-ast";
import { AppExp, AtomicExp, BoolExp, CompoundExp, CExp, DefineExp, Exp, IfExp, LitExp, NumExp,
         Parsed, PrimOp, ProcExp, Program, StrExp, VarDecl, VarRef } from "./L3-ast";
import { allT, getErrorMessages, hasNoError, isError }  from "./L3-ast";
import { isAppExp, isBoolExp, isCExp, isDefineExp, isExp, isIfExp, isLetExp, isLitExp, isNumExp,
             isPrimOp, isProcExp, isProgram, isStrExp, isVarRef } from "./L3-ast";
import { makeAppExp, makeBoolExp, makeIfExp, makeLitExp, makeNumExp, makeProcExp, makeStrExp,
         makeVarDecl, makeVarRef } from "./L3-ast";
import { parseL3 } from "./L3-ast";
import { isClosure, isCompoundSExp, isEmptySExp, isSymbolSExp, isSExp,
         makeClosure, makeCompoundSExp, makeEmptySExp, makeSymbolSExp,
         Closure, CompoundSExp, SExp, Value } from "./value";

export const rewriteLetStar = (cexp: Parsed | Error) : LetExp  | Error =>

    isLetStarExp(cexp) ?   cexp.bindings.length > 1 ?  makeLetExp([cexp.bindings[0]], [<CExp>rewriteLetStar(makeLetStarExp(cexp.bindings.slice(1),cexp.body))]) :
                                                        makeLetExp([cexp.bindings[0]],cexp.body):
        Error("Error: not a Let* expression");







 export const rewriteAllLetStar = (cexp: Parsed | Binding | Error) : Parsed | Binding | Error =>

     isDefineExp(cexp)? makeDefineExp(cexp.var,<CExp>rewriteAllLetStar(cexp.val)):
     isProgram(cexp)? makeProgram(map(rewriteAllLetStar,cexp.exps)):
     isProcExp(cexp)?   makeProcExp(cexp.args , map(rewriteAllLetStar,cexp.body)):
     isBinding(cexp)? makeBinding(cexp.var,<CExp>rewriteAllLetStar(cexp.val)):
     isLetExp(cexp)? makeLetExp(map(rewriteAllLetStar,cexp.bindings),map(rewriteAllLetStar,cexp.body)):
     isLetStarExp(cexp)? rewriteLetStar(makeLetStarExp(map(rewriteAllLetStar,cexp.bindings),map(rewriteAllLetStar,cexp.body))):
     isAppExp(cexp)? makeAppExp(<CExp>rewriteAllLetStar(cexp.rator),map(rewriteAllLetStar,cexp.rands)):
     isIfExp(cexp)? makeIfExp(<CExp>rewriteAllLetStar(cexp.test),<CExp>rewriteAllLetStar(cexp.then),<CExp>rewriteAllLetStar(cexp.alt)):
     cexp;




//function main(){
console.log(JSON.stringify(
    rewriteAllLetStar(parseL3("(let* ((x (let*((y 5))\n" +
        "            y))\n" +
        "       (z 7))\n" +
        "  \n" +
        "  (+ x (let* ((t 12)) t)))\n" +
        "\n")),null,4));



//}