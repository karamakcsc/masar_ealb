import frappe

@frappe.whitelist()
def populateNews():
    query = frappe.db.sql("""
                    SELECT news_title, news, publish_date, is_published, _from, _to, news_summary
                    FROM `tabNews`
                    WHERE docstatus = 1 AND is_published = 1 AND publish_date BETWEEN _from AND _to
                    """, as_dict=True)
    result = []
    for row in query:
        news_dict = {
            'news_title': row.get('news_title'),
            'article': row.get('news'),
            'publish_date': row.get('publish_date'),
            'newsSummary': row.get('news_summary')
        }
        result.append(news_dict)
    return result

@frappe.whitelist()
def populateAnnouncements():
    query = frappe.db.sql("""
                    SELECT announcement_title, announcements, publish_dates, is_publish, _fromd, _tod, announcement_summary
                    FROM `tabAnnouncements`
                    WHERE docstatus = 1 AND is_publish = 1 AND publish_dates BETWEEN _fromd AND _tod
                          """, as_dict=True)
    result = []
    for row in query:
        announcement_dict = {
            'announcement_title': row.get('announcement_title'),
            'announcements': row.get('announcements'),
            'pub_date': row.get('publish_dates'),
            'announcementSummary': row.get('announcement_summary')
        }
        result.append(announcement_dict)
    return result

@frappe.whitelist()
def urlData():
    log_out_url = ''
    mypage_url = ''
    drive_url = ''
    gameplan_url = ''

    doc = frappe.get_doc('URL Bar Settings')
    return {
        'log_out_url' : doc.log_out,
        'mypage_url' : doc.news_page,
        'drive_url' : doc.drive,
        'gameplan_url' : doc.gameplan
    }
