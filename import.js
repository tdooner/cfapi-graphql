/*
 * Salesforce Query:
 * SELECT Name,Brigade_Location__c,
Primary_Contact_Email__c,Brigade_Public_Email__c,Website, Site_Link__c,
MeetUp_Link__c, Github_URL__c, Brigade_Region__c,Organization_Twitter__c,Facebook_Page_URL__c
FROM Account WHERE Brigade_Type__c = 'Brigade' AND (Brigade_Status__c = 'Signed MOU' OR Brigade_Status__c = 'MOU in Process')
*/

const fs = require('fs');

const parse = require('csv-parse/lib/sync');

const { Brigade } = require('./db');

// "safe_name" logic from here: https://github.com/codeforamerica/cfapi/blob/master/utils.py
const slugifyName = name => name.replace(/[\s/?#]/g, '-');

const file = fs.readFileSync('/Users/tdooner/Downloads/bulkQuery_result_7500W00000IMZ2JQAX_7510W00000NmTnyQAF_7520W000008w4uG.csv');
const brigades = parse(file, { columns: true });

brigades.forEach((row) => {
  let [city, state] = row.Brigade_Location__c.split(/,\s?/);
  if (!state) { // Open NC Collaborative, New Hampshire, etc.
    state = city;
    city = null;
  }

  const updateAttributes = {
    slug: slugifyName(row.Name),
    name: row.Name,
    website: row.Website.length ? row.Website : null,
    city,
    state,
    region: row.Brigade_Region__c,
    latitude: 12.1234, // TODO
    longitude: 12.1234, // TODO
    tags: ['Official', 'Code for America', 'Brigade'],
    links: {},
  };
  if (row.MeetUp_Link__c.length) {
    updateAttributes.links['meetup'] = row.MeetUp_Link__c;
  }
  if (row.Github_URL__c.length) {
    updateAttributes.links['github'] = row.Github_URL__c;
  }
  if (row.Organization_Twitter__c.length) {
    updateAttributes.links['twitter'] = row.Organization_Twitter__c;
  }
  if (row.Facebook_Page_URL__c.length) {
    updateAttributes.links['facebook'] = row.Facebook_Page_URL__c;
  }

  Brigade
    .findOne({ where: { slug: updateAttributes.slug } })
    .then((brigade) => {
      if (brigade) {
        brigade.update(updateAttributes);
      } else {
        Brigade.create(updateAttributes);
      }
    });
});
