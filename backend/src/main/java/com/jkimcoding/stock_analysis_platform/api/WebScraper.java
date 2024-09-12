package com.jkimcoding.stock_analysis_platform.api;

import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.HtmlAnchor;
import com.gargoylesoftware.htmlunit.html.HtmlElement;
import com.gargoylesoftware.htmlunit.html.HtmlHeading3;
import com.gargoylesoftware.htmlunit.html.HtmlPage;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
public class WebScraper {

    public List<String> scrapeHeaders() throws IOException {
        List<String> list = new ArrayList<>();

        String baseUrl = "https://www.reuters.com/business/finance/";
        try (WebClient client = new WebClient()) {
            client.getOptions().setCssEnabled(false);
            client.getOptions().setJavaScriptEnabled(false);

            HtmlPage page = client.getPage(baseUrl);

            // XPath to find all <li> elements containing the relevant class
            List<HtmlElement> items = page.getByXPath("//li[contains(@class, 'story-collection__list-item')]");

            if (items.isEmpty()) {
                System.out.println("No story items found.");
                return list;
            }

            // Loop through the list of items and print the <h3> text and link
            for (int i = 0; i < 2; i++) {

                HtmlElement item = items.get(i);

                // TODO: need to extract all the headers
                extractHeaderInfo(item, list);
                System.out.println("-----------");

            }
        } catch (Exception e) {
            System.out.println(e);
            return Collections.emptyList();
        }


        return list;
    }

    private void extractHeaderInfo(HtmlElement item, List<String> list) {
        // Extract the <h3> element
        HtmlHeading3 h3Element = item.getFirstByXPath(".//h3[@data-testid='Heading']");
        if (h3Element != null) {
            String h3Text = h3Element.asNormalizedText();
            System.out.println("h3 text: " + h3Text);

            list.add(h3Text);
            // Extract the <a> element with the link
            HtmlAnchor anchorElement = h3Element.getFirstByXPath(".//a[@data-testid='Link']");
            if (anchorElement != null) {
                String linkHref = anchorElement.getHrefAttribute();
                System.out.println("Link href: " + linkHref);
                System.out.println("Link href: " + anchorElement);
            } else {
                System.out.println("Link not found.");
            }
        } else {
            System.out.println("<h3> element not found.");
        }
    }
}
