var envGroups = eval('(' + MANIFEST + ')').envGroups,
    onAfterReturn = { setGlobals: {} }, 
    glbs = onAfterReturn.setGlobals,
    resp;
resp = jelastic.env.control.GetRegionsInner(appid, session, '${account.group}', true);
if (resp.result != 0) return resp;
resp = resp.array;
glbs["domain"] = resp[0].domain;
for (var i = 0, n = resp.length; i < n; i++) {
  for (var k = 0, l = resp[i].hardNodeGroups.length; k < l; k++) {
    if (resp[i].hardNodeGroups[k].uniqueName == '${settings.region}')
      glbs["domain"] = resp[i].domain;
  }
}
glbs["envGroups"] = envGroups;
return { result: 0, onAfterReturn: onAfterReturn };
