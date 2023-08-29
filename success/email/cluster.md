**WordPress URL**: [${globals.PROTOCOL}://${settings.envName}.${globals.domain}/](${globals.PROTOCOL}://${settings.envName}.${globals.domain}/)

Please use the following data to access the admin panels:

WordPress Admin Panel:  
**URL**: [${globals.PROTOCOL}://${settings.envName}.${globals.domain}/wp-admin/](${globals.PROTOCOL}://${settings.envName}.${globals.domain}/wp-admin/)  
**Login**: ${user.email}  
**Password**: ${globals.wp_admin_pass}  

LiteSpeed ADC admin Panel:   
**URL**: [${globals.PROTOCOL}://node${nodes.bl.master.id:[globals.targetNodes.master.bl.id]}-${settings.envName}.${globals.domain}:4848](${globals.PROTOCOL}://node${nodes.bl.master.id:[globals.targetNodes.master.bl.id]}-${settings.envName}.${globals.domain}:4848)  
**Login**: admin  
**Password**: ${globals.ls_admin_pass}  

LiteSpeed WEB Server admin Panel:   
**URL**: [${globals.PROTOCOL}://node${nodes.cp.master.id:[globals.targetNodes.master.cp.id]}-${settings.envName}.${globals.domain}:4848](${globals.PROTOCOL}://node${nodes.bl.master.id:[globals.targetNodes.master.cp.id]}-${settings.envName}.${globals.domain}:4848)  
**Login**: admin  
**Password**: ${globals.ls_admin_pass}  

phpMyAdmin Panel:   
**URL**: [${globals.PROTOCOL}://node${nodes.sqldb.master.id:[globals.targetNodes.master.sqldb.id]}-${settings.envName}.${globals.domain}/](${globals.PROTOCOL}://node${nodes.sqldb.master.id:[globals.targetNodes.master.sqldb.id]}-${settings.envName}.${globals.domain}/)  
**Username**: ${globals.db_user}    
**Password**: ${globals.db_pass}  
