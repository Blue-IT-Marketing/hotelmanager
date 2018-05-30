#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import os
from google.appengine.ext import blobstore
from google.appengine.ext.webapp import blobstore_handlers
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
import logging
import datetime
template_env = jinja2.Environment(loader=jinja2.FileSystemLoader(os.getcwd()))
#import firebase_admin
#from firebase_admin import credentials
#cred = credentials.Certificate('templates/firebase/service_account.json')
#default_app = firebase_admin.initialize_app(cred)

#TODO- Create a main router for all the URLS
#TODO- The main routers should route only this Address /.* and will work as long as its the last router to execute and also help catch all other errors

class MainRouterHandler(webapp2.RequestHandler):

    def RouteSitemap(self):
        #TODO- Consider creating a dynamic sitemap by actually crawling my site and then outputting the sitemap here
        #TODO- i think i use to have a function to do this coupled with thoth
        template = template_env.get_template('templates/sitemap/sitemap.xml')
        context = {}
        self.response.headers["Content-Type"] = 'text/xml'
        self.response.write(template.render(context))

    def RouteRobots(self):
        template = template_env.get_template('templates/sitemap/robots.txt')
        context = {}
        self.response.headers["Content-Type"] = "text/plain"
        self.response.write(template.render(context))

    def RouteHome(self):
        template = template_env.get_template('templates/index.html')
        context = {}
        self.response.write(template.render(context))

    def RouteLogin(self):
        template = template_env.get_template('templates/authentication/login.html')
        context = {}
        self.response.write(template.render(context))

    def RouteLogout(self):
        template = template_env.get_template('templates/authentication/logout.html')
        context = {}
        self.response.write(template.render(context))

    def RouteFAQ(self):

        template = template_env.get_template('templates/faq/faq.html')
        context = {}
        self.response.write(template.render(context))

    def RoutePricing(self):
        template = template_env.get_template('templates/pricing/pricing.html')
        context = {}
        self.response.write(template.render(context))

    def RouteLoginPost(self,vstrChoice):
        from accounts import Accounts,Organization
        #from firebase_admin import auth

        if vstrChoice == "0":
            template = template_env.get_template('templates/authentication/loggedin.html')
            context = {}
            self.response.write(template.render(context))
        elif vstrChoice == "1":
            template = template_env.get_template('templates/authentication/loggedout.html')
            context = {}
            self.response.write(template.render(context))

        elif vstrChoice == "2":
            vstrDisplayName = self.request.get('vstrDisplayName')
            vstrEmail = self.request.get('vstrEmail')
            vstremailVerified = self.request.get('vstremailVerified')
            vstrUserID = self.request.get('vstrUserID')
            vstrPhoneNumber = self.request.get('vstrPhoneNumber')
            vstrProviderData = self.request.get('vstrProviderData')
            vstrAccessToken = self.request.get('vstrAccessToken')

            #decode_token = auth.verify_id_token(vstrAccessToken)
            #uid = decode_token['uid']

            findRequest = Accounts.query(Accounts.strUserID == vstrUserID)
            thisAccountList = findRequest.fetch()

            if len(thisAccountList) > 0:
                thisAccount = thisAccountList[0]
                thisAccount.writeEmail(strinput=vstrEmail)
                findRequest = Organization.query(Organization.strOrganizationID == thisAccount.strOrganizationID)
                thisOrgList = findRequest.fetch()
                if len(thisOrgList) > 0:
                    thisOrg = thisOrgList[0]
                    thisOrg.writeUserID(strinput=vstrUserID)
                    thisOrg.put()

            else:
                findRequest = Accounts.query(Accounts.strEmail == vstrEmail)
                thisAccountList = findRequest.fetch()
                if len(thisAccountList) > 0:
                    thisAccount = thisAccountList[0]
                    thisAccount.writeUserID(strinput=vstrUserID)
                    findRequest = Organization.query(Organization.strOrganizationID == thisAccount.strOrganizationID)
                    thisOrgList = findRequest.fetch()
                    if len(thisOrgList) > 0:
                        thisOrg = thisOrgList[0]
                        thisOrg.writeUserID(strinput=vstrUserID)
                        thisOrg.put()
                else:
                    thisAccount = Accounts()
                    thisAccount.writeUserID(strinput=vstrUserID)
                    thisAccount.writeNames(strinput=vstrDisplayName)
                    thisAccount.writeEmail(strinput=vstrEmail)
                    thisAccount.writeProviderData(strinput=vstrProviderData)


            if vstremailVerified == "YES":
                thisAccount.writeVerified(strinput=True)
            else:
                thisAccount.writeVerified(strinput=False)
                thisAccount.writeUserID(strinput=vstrUserID)
                thisAccount.writeCell(strinput=vstrPhoneNumber)
                thisAccount.writeProviderData(strinput=vstrProviderData)

            thisAccount.writeAccessToken(strinput=vstrAccessToken)
            thisAccount.put()

            #TODO - Refine this part


    def RouteServiceAccount(self):
        template = template_env.get_template('templates/firebase/service_account.json')
        context = {}
        self.response.write(template.render(context))

    def get(self):
        """
            The Main Get Router entry point
        :return:
        """
        URL = self.request.url
        URL = str(URL)
        URL = URL.lower()
        strURLlist = URL.split("/")

        if len(strURLlist) == 4:

            if ("index" in strURLlist) or ("index.html" in strURLlist):
                self.RouteHome()
            elif ("login" in strURLlist) or ("login.html" in strURLlist) or ("signin" in strURLlist) or ("signin.html" in strURLlist) or ("subscribe" in strURLlist) or ("subscribe.html" in strURLlist):
                self.RouteLogin()

            elif ("logout" in strURLlist) or ("logout.html" in strURLlist) or ("signout" in strURLlist) or ("signout.html" in strURLlist):
                self.RouteLogout()

            elif ("faq" in strURLlist) or ("faq.html" in strURLlist):
                self.RouteFAQ()

            elif ("pricing" in strURLlist) or ("pricing.html" in strURLlist):

                self.RoutePricing()

            elif "sitemap.xml" in strURLlist:
                self.RouteSitemap()
            elif "robots.txt" in strURLlist:
                self.RouteRobots()

            else:
                self.RouteHome()

        else:
            self.RouteHome()

    def post(self):
        """
            The Main Post Router will also have sub routers for login and logout
        :return:
        """
        URL = self.request.url
        URL = str(URL)
        URL = URL.lower()
        strURLlist = URL.split("/")
        if len(strURLlist) == 4:
            if ("login" in strURLlist) or ("login.html" in strURLlist) or ("signin" in strURLlist) or ("signin.html" in strURLlist) or ("subscribe" in strURLlist) or ("subscribe.html" in strURLlist):
                vstrChoice = self.request.get("vstrChoice")
                self.RouteLoginPost(vstrChoice=vstrChoice)
            else:
                pass
        else:
            pass


app = webapp2.WSGIApplication([
    ('.*', MainRouterHandler)

], debug=True)
