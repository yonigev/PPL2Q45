import { CExp, Exp, PrimOp, Program, DefineExp } from "./L1-ast";
import { hasError, isAppExp, isBoolExp, isCExp, isDefineExp, isError, isNumExp, isPrimOp,
         isProgram, isVarRef, isVarDecl } from "./L1-ast";
import { parseL1 } from "./L1-ast";
import { first, isEmpty, rest } from "./L1-ast";
import * as assert from "assert";
import { filter, map, reduce } from "ramda";
import {getErrorMessages} from "./L3-ast";
// Implement the following function:
export const unparse = (x: Program | DefineExp | CExp) : string | Error => 
           isProgram(x)?  "(L1 "+map(unparse,x.exps).join(" ")+")":
           isDefineExp(x)? "("+"define "+unparse(x.var)+" "+unparse(x.val)+")":
           isAppExp(x)? "("+unparse(x.rator)+" "+map(unparse,x.rands).join(" ")+")":
           isBoolExp(x)? x.val === true ? "#t": "#f" :
           isNumExp(x)? x.val.toString():
           isPrimOp(x)? x.op.toString():
           isVarRef(x)? x.var.toString():
           isVarDecl(x)? x.var.toString():             
           x.message.toString()                         //ERROR
           

           

 