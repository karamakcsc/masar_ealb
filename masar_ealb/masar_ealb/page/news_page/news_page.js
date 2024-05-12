frappe.pages['news-page'].on_page_load = function(wrapper) {
    new MyPage(wrapper);
}

class MyPage {
    constructor(wrapper) {
        this.page = frappe.ui.make_app_page({
            parent: wrapper,
            title: '',
            single_column: true
        });
        this.make();
    }

    make() {
        const body = `
            <div class="noti-bar" id="noti-bar">
            </div>
            <br>
            <h4>News</h4>
            <div id="news-card-container"></div>
            <div class="popup" id="popup_news"></div>
			<h4>Announcements</h4>
            <div id="announcements-card-container"></div>
            <div class="popup" id="popup_announcements"></div>
        `;



        const style = `
            .news-card {
                display: inline-block;
                width: 250px;
                height: 225px;
                background-color: #f8f8f8;
                margin: 10px;
                padding: 10px;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                overflow: auto;
                cursor: pointer;
            }

            .news-card h4 {
                margin-top: 0;
            }

			.news-card h6 {
                margin-top: 0;
            }

            .news-card p {
                margin-bottom: 0;
            }
			.announcements-card {
                display: inline-block;
                width: 250px;
                height: 225px;
                background-color: #f8f8f8;
                margin: 10px;
                padding: 10px;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                overflow: auto;
                cursor: pointer;
            }

            .announcements-card h4 {
                margin-top: 0;
            }

			.announcements-card h6 {
                margin-top: 0;
            }

            .announcements-card p {
                margin-bottom: 0;
            }

            .popup {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s ease;
            }

            .popup-content {
                background-color: #fff;
                padding: 20px;
                border-radius: 5px;
                max-width: 500px;
                max-height: 80vh;
                overflow-y: auto;
            }

            .popup-content h3 {
                margin-top: 0;
            }

            .popup-content h5 {
                margin-top: 0;
            }

            .popup-content p {
                margin-bottom: 0;
            }

            .buttons {
                position: absolute;
                top: 10px;
                right: 10px;
                
              }

            .button-s {
                background-color: #ADD8E6;
                border: 0;
                border-radius: .5rem;
                box-sizing: border-box;
                color: #111827;
                font-family: "Inter var",ui-sans-serif,system-ui,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
                font-size: .875rem;
                font-weight: 600;
                line-height: 1rem;
                padding: .75rem 1rem;
                text-align: center;
                text-decoration: none #D1D5DB solid;
                text-decoration-thickness: auto;
                box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
            }
        `;

        $(body).appendTo(this.page.main);
        $(`<style>${style}</style>`).appendTo(this.page.main);

        this.populateNewsPopupCard();
        this.populateAnnouncementsPopupCard();
        this.populateNewsCard();
        this.populateAnnouncementsCard();
        this.urlData();
    }

    populateNewsCard() {
        frappe.call({
            method: "masar_ealb.masar_ealb.page.news_page.news_page.populateNews",
            callback: (r) => {
                let newsData = '';
                r.message.forEach((item, index) => {
                    newsData += `
                        <div class="news-card" onclick="showPopup('#news-popup${index + 1}')">
                            <h4>${item.news_title}</h4>
                            <h6>${item.publish_date}</h6>
                            <p>${item.newsSummary}</p>
                        </div>
                    `;
                });
                $('#news-card-container').html(newsData);
            }
        });
    }

    populateAnnouncementsCard() {
        frappe.call({
            method: "masar_ealb.masar_ealb.page.news_page.news_page.populateAnnouncements",
            callback: (r) => {
                let announcementData = '';
                r.message.forEach((item, index) => {
                    announcementData += `
                        <div class="announcements-card" onclick="showPopup('#announcement-popup${index + 1}')">
                            <h4>${item.announcement_title}</h4>
                            <h6>${item.pub_date}</h6>
                            <p>${item.announcementSummary}</p>
                        </div>
                    `;
                });
                $('#announcements-card-container').html(announcementData);
            }
        });
    }

    populateNewsPopupCard() {
        frappe.call({
            method: "masar_ealb.masar_ealb.page.news_page.news_page.populateNews",
            callback: (r) => {
                let newsPopupData = '';
                r.message.forEach((item, index) => {
                    newsPopupData += `
                        <div class="popup-content" id="news-popup${index + 1}">
					        <h3 id="popup-news-title">${item.news_title}</h3>
                            <h5 id="popup-news-date">${item.publish_date}</h5>
					        <p id="popup-news">${item.article}</p>
				        </div>
                    `;
                });
                $('#popup_news').html(newsPopupData);
            }
        });
    };

    populateAnnouncementsPopupCard() {
        frappe.call({
            method: "masar_ealb.masar_ealb.page.news_page.news_page.populateAnnouncements",
            callback: (r) => {
                let announcementPopupData = '';
                r.message.forEach((item, index) => {
                    announcementPopupData += `
                        <div class="popup-content" id="announcement-popup${index + 1}">
                            <h3 id="popup-announcement-title">${item.announcement_title}</h3>
                            <h5 id="popup-announcement-date">${item.pub_date}</h5>
                            <p id="popup-announcements">${item.announcements}</p>
                        </div>
                    `;
                });
                $('#popup_announcements').html(announcementPopupData);
            }
        });
    };

    urlData() {
        frappe.call({
            method: "masar_ealb.masar_ealb.page.news_page.news_page.urlData",
            callback: (response) => {
                const { log_out_url, drive_url, gameplan_url, mypage_url } = response.message;
    
                const urlButtons = `
                  <div class="buttons" id="buttons"> 
                    <button class="button-s" onclick="window.open('${log_out_url}')">Log Out</button>
                    <button class="button-s" onclick="window.open('${drive_url}')">Drive</button>
                    <button class="button-s" onclick="window.open('${gameplan_url}')">Gameplan</button>
                    <button class="button-s" onclick="window.open('${mypage_url}')">Mypage</button>
                    <button class="button-s" type="button" onclick="window.location.reload()">Refresh</button>
                  </div>  

                `;
    
                $('#noti-bar').html(urlButtons);
            }
        });
    };
}
function hidePopup() {
    $('.popup-content').hide();
}
function showPopup(popupId) {
    $('.popup-content').hide(); 
    $(popupId).show();
    const popupContent = $(popupId).html();
    frappe.msgprint(popupContent);
}