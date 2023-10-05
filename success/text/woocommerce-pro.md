**WordPress URL**: [${globals.PROTOCOL}://${settings.envName}.${globals.domain}/](${globals.PROTOCOL}://${settings.envName}.${globals.domain}/)

Please use the following data to access the admin panels:

WordPress Admin Panel:   
**URL**: [${globals.PROTOCOL}://${settings.envName}.${globals.domain}/wp-admin/](${globals.PROTOCOL}://${settings.envName}.${globals.domain}/wp-admin/)  
**Login**: ${user.email}  
**Password**: ${globals.wp_admin_pass}  

LiteSpeed Admin Panel:   
**URL**: [${globals.PROTOCOL}://${settings.envName}.${globals.domain}:4848/](${globals.PROTOCOL}://${settings.envName}.${globals.domain}:4848/)   
**Login**: admin    
**Password**: ${globals.db_pass}  

PhpMyAdmin Admin Panel:   
**URL**: [${globals.PROTOCOL}://${settings.envName}.${globals.domain}:8443/](${globals.PROTOCOL}://${settings.envName}.${globals.domain}:8443/)  
**Username**: ${globals.db_user}    
**Password**: ${globals.db_pass}  
