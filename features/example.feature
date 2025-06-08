@smoke @regression
Feature: Playwright Documentation Navigation
  As a developer
  I want to navigate the Playwright documentation
  So that I can learn how to use Playwright for testing

  Background:
    Given I am on the Playwright homepage

  @critical
  Scenario: Navigate to Getting Started
    When I click on the "Get started" link
    Then I should be on the getting started page
    And the page should contain installation instructions

  @search
  Scenario: Search for API documentation
    When I search for "API testing"
    Then I should see search results
    And the results should contain relevant API information

  @navigation
  Scenario Outline: Navigate to different sections
    When I click on the "<section>" link
    Then I should be on the "<expected_page>" page
    And the page title should contain "<title_text>"

    Examples:
      | section     | expected_page | title_text |
      | Get started | intro         | Playwright |
      | API         | api           | API        |
      | Docs        | docs          | Playwright |

  @responsive
  Scenario: Mobile navigation
    Given I am using a mobile device
    When I navigate to the homepage
    Then the mobile menu should be accessible
    And all navigation elements should be visible 