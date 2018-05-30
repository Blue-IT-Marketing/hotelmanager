import os
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
import logging
template_env = jinja2.Environment(loader=jinja2.FileSystemLoader(os.getcwd()))

from tasks import Tasks
class SidebarHandler(webapp2.RequestHandler):
    """
        Check if the User Logged in load all defaults for the user on the sidebar including username
        profile information and others
        Sidebar variables
        vstrUsername
        vstrLogoutURL
        vstrLoginURL

    """
    def get(self):
        Guser = users.get_current_user()
        vstrLogoutURL = users.create_logout_url(dest_url="/")
        vstrLoginURL = users.create_login_url(dest_url="/")
        if Guser:
            vstrUsername = Guser.nickname()
            template = template_env.get_template('templates/dynamic/navigation/sidebar.html')
            context = {'vstrUsername': vstrUsername,
                       'vstrLogoutURL': vstrLogoutURL}
            self.response.write(template.render(context))
        else:
            template = template_env.get_template('templates/dynamic/navigation/sidebar.html')
            context = {'vstrLoginURL': vstrLoginURL}
            self.response.write(template.render(context))

class AdminSideBar(webapp2.RequestHandler):
    def get(self):
        Guser = users.get_current_user()
        vstrLogoutURL = users.create_logout_url(dest_url="/")
        vstrLoginURL = users.create_login_url(dest_url="/")

        if Guser:
            vstrUsername = Guser.nickname()

            template = template_env.get_template('templates/dynamic/admin/navigation/sidebar.html')
            context = {'vstrUsername': vstrUsername,
                       'vstrLogoutURL': vstrLogoutURL}
            self.response.write(template.render(context))
        else:
            template = template_env.get_template('templates/dynamic/admin/navigation/sidebar.html')
            context = {'vstrLoginURL': vstrLoginURL}
            self.response.write(template.render(context))


class HeaderHandler(webapp2.RequestHandler):
    """
        Header Variables
        vstrUsername
        vstrDesignation
        vstrTotalMessages
        vstrTotalNotifications
        vstrTotalTasks
        vstrLogoutURL

    """
    def get(self):
        Guser = users.get_current_user()
        if Guser:
            vstrUsername = Guser.nickname()
            vstrLogoutURL = users.create_logout_url(dest_url="/")

            findRequest = Tasks.query(Tasks.strToReference == Guser.user_id())
            TaskList = findRequest.fetch()
            vstrTotalTasks = len(TaskList)

            template = template_env.get_template('templates/dynamic/navigation/header.html')
            context = {'vstrUsername': vstrUsername, 'vstrLogoutURL': vstrLogoutURL,
                       'TaskList':TaskList,'vstrTotalTasks':vstrTotalTasks}
            self.response.write(template.render(context))
        else:
            vstrLoginURL = users.create_login_url(dest_url="/")

            template = template_env.get_template('templates/dynamic/navigation/header.html')
            context = {'vstrLoginURL': vstrLoginURL}
            self.response.write(template.render(context))

class AdminHeader(webapp2.RequestHandler):
    def get(self):
        Guser = users.get_current_user()
        if Guser:
            vstrUsername = Guser.nickname()
            vstrLogoutURL = users.create_logout_url(dest_url="/")

            findRequest = Tasks.query(Tasks.strToReference == Guser.user_id())
            TaskList = findRequest.fetch()
            vstrTotalTasks = len(TaskList)


            template = template_env.get_template('templates/dynamic/admin/navigation/header.html')
            context = {'vstrUsername': vstrUsername,'vstrLogoutURL': vstrLogoutURL,
                       'TaskList':TaskList,'vstrTotalTasks':vstrTotalTasks}
            self.response.write(template.render(context))
        else:
            vstrLoginURL = users.create_login_url(dest_url="/")

            template = template_env.get_template('templates/dynamic/admin/navigation/header.html')
            context = {'vstrLoginURL': vstrLoginURL}
            self.response.write(template.render(context))

class FooterHandler(webapp2.RequestHandler):
    def get(self):
        template = template_env.get_template('templates/dynamic/navigation/footer.html')
        context = {}
        self.response.write(template.render(context))

app = webapp2.WSGIApplication([
    ('/navigation/sidebar', SidebarHandler),
    ('/navigation/admin/header',AdminHeader),
    ('/navigation/header', HeaderHandler),
    ('/navigation/admin/sidebar',AdminSideBar),
    ('/navigation/footer', FooterHandler)


], debug=True)