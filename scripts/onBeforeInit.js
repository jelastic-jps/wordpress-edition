import com.hivext.api.Response;

var cdnAppid = "c05ffa5b45628a2a0c95467ebca8a0b4",
    lsAppid = "9e6afcf310004ac84060f90ff41a5aba",
    fields = {},
    field,
    resp,
    LS = "ls-addon",
    CDN = "cdn-addon";

function defineAppFields(appid, name) {
    resp = jelastic.dev.apps.GetApp(appid);

    if (resp.result == 0 || resp.result == Response.PERMISSION_DENIED) {
        fields[name].hidden = false;
        fields[name].value = true;
    } else {
        fields[name].hidden = true;
        fields[name].value = false;
    }
}

jps.settings = jps.settings || {};
jps.settings.fields = jps.settings.fields || [];

if (jps.settings.fields.length) {
  for (var i = 0, n = jps.settings.fields.length; i < n; i++) {
      field = jps.settings.fields[i];
      fields[field.name] = field;
  }

  if (fields[CDN]) defineAppFields(cdnAppid, CDN);
  if (fields[LS]) defineAppFields(lsAppid, LS);

}

resp = api.environment.control.GetEnvs();
if (resp.result != 0) return resp;

if (parseInt("${quota.environment.maxcount:0}", 10) <= resp.infos.length) {
  jps.settings.fields.push({
    type: "displayfield",
    cls: "warning",
    height: 30,
    hideLabel: true,
    hidden: false,
    markup: "The number of environments is limited to ${quota.environment.maxcount} per account. Please contact support to get extended possibilities."
  });
  jps.settings.fields.push({
      "type": "compositefield",
      "height": 0,
      "hideLabel": true,
      "width": 0,
      "items": [{
          "height": 0,
          "type": "string",
          "required": true,
      }]
  });
}

return {
    result: 0,
    settings: jps.settings
};
