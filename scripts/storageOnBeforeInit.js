var STORAGE_NODE_DISK_LIMITATION = "storage.node.disk.limitation",
    SAME_NODES = "environment.maxsamenodescount",
    MAX_NODES = "environment.maxnodescount";

var max = 7, min = 1, resp, name, value, minStorageSize = 5, maxStorageSize, storageMarkup = "Storage size must be at least 5 GB.", 
    nodesMarkup = "Clustered mode is unavailable. Please check this quotas:", nodesMarkupHidden = true;

var hasCollaboration = (parseInt('${fn.compareEngine(7.0)}', 10) >= 0),
    quotas = [];

if (hasCollaboration) {
    quotas = [
        { quota : { name: MAX_NODES }, value: parseInt('${quota.environment.maxnodescount}', 10) },
        { quota : { name: SAME_NODES }, value: parseInt('${quota.environment.maxsamenodescount}', 10) },
        { quota : { name: STORAGE_NODE_DISK_LIMITATION }, value: parseInt('${quota.storage.node.disk.limitation}', 10) }
    ];
    group = { groupType: '${account.groupType}' };
} else {
    quotas.push(jelastic.billing.account.GetQuotas(STORAGE_NODE_DISK_LIMITATION).array[0]);
    quotas.push(jelastic.billing.account.GetQuotas(SAME_NODES).array[0]);
    quotas.push(jelastic.billing.account.GetQuotas(MAX_NODES).array[0]);
    group = jelastic.billing.account.GetAccount(appid, session);
}

for (var i = 0, n = quotas.length; i < n; i++) {
  name = quotas[i].quota.name;
  value = quotas[i].value;
  
  if (name == MAX_NODES || name == SAME_NODES) {
      if (max >= value) {
          max = value;
          if (value < 3) { nodesMarkup = nodesMarkup + " " + name };
      }
  }
  if (name == STORAGE_NODE_DISK_LIMITATION) maxStorageSize = parseInt(value/1000);
}

jps.settings = {};
jps.settings.fields = [];

if ( max < 3 ) {
    nodesMarkupHidden = false;
}
  
jps.settings.fields.push({"type":"radio-fieldset","name":"customName","hidden":false,"default":"1","values":{"1":"Standalone","2":"Cluster"},"showIf":{"2":[{"type":"spinner","name":"storageNodesCount","caption":"Number of nodes","min":3,"max":max,"increment":2},{"type":"displayfield","cls":"warning","height":30,"hideLabel":true,"markup":nodesMarkup,"hidden":nodesMarkupHidden},{"type":"string","name":"clustered","value":true,"inputType":"hidden"}]}});
jps.settings.fields.push({"type":"spinner","name":"diskspace","caption":"Storage size, GB","min":5,"max":maxStorageSize,"default":maxStorageSize,"increment":1});
jps.settings.fields.push({"type":"separator"});
jps.settings.fields.push({"type":"envname","name":"envName","caption":"Environment","dependsOn":"region","required":true});
jps.settings.fields.push({"type":"string","name":"displayName","caption":"Display Name","default":"Backup Storage"});
jps.settings.fields.push({"caption":"Region","type":"regionlist","name":"region","disableInactive":true,"selectFirstAvailable":true,"stateId":"wp","dependsOn":"ownerUid"},{"type":"owner","name":"ownerUid","caption":"Owner"});

if ( maxStorageSize < 5 ) {
    jps.settings.fields.push(
        {"type": "displayfield", "cls": "warning", "height": 30, "hideLabel": true, "markup": storageMarkup}
    )
}
return {
  result: 0,
  fields: jps.settings.fields
};
