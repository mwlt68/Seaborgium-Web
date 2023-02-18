export class UrlHelper{
    static  Create(root:string,queryParamKey:string,queryParamValue:string):string{
        return root +"?"+queryParamKey+"="+queryParamValue;
    }
}