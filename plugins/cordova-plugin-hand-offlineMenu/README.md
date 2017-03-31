1.调用方式及参数
LocalPagePlugin.updateLocalPage(suc,err,{
										updateModules:[
												{

                                             moduleId:'',
                                             downloadUrl:"",
                                             zipName:"newwww.zip",
                                             unZipPath:"", 
                                             version:""
												},
												{
                                            downloadUrl:"http://nj01ct01.baidupcs.com/file/5062eeda4ed698b20f63ce44ed830d62?bkt=p3-14005062eeda4ed698b20f63ce44ed830d62356f543c0000000001fc&fid=474689343-250528-817398124562431&time=1488246608&sign=FDTAXGERLBH-DCb740ccc5511e5e8fedcff06b081203-%2BpaUMnuOQz2JaY4zD6IiupW3qYI%3D&to=njhb&fm=Yan,B,T,t&sta_dx=508&sta_cs=&sta_ft=zip&sta_ct=0&sta_mt=0&fm2=Yangquan,B,T,t&newver=1&newfm=1&secfm=1&flow_ver=3&pkey=14005062eeda4ed698b20f63ce44ed830d62356f543c0000000001fc&sl=81723466&expires=8h&rt=pr&r=519976860&mlogid=1354688712325706095&vuk=474689343&vbdid=2463435991&fin=www.zip&fn=www.zip&slt=pm&uta=0&rtype=1&iv=0&isw=0&dp-logid=1354688712325706095&dp-callid=0.1.1&csl=1024&csign=2Cs4NH1W0NvhS7Ca%2BEFuhfOCnc4%3D&by=flowserver",

												]
									}
							);
							
							
LocalPagePlugin.openPage(suc,err,{

            moduleId:'',
			localUrl:"/newwww/index2.html",
			version:""
		}); 							
