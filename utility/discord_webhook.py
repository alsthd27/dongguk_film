import os, sys

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

from dongguk_film import settings
from django.utils import timezone
import discord
from discord import Webhook, RequestsWebhookAdapter


discord_mgt_webhook_url = getattr(
    settings, "DISCORD_MGT_WEBHOOK_URL", "DISCORD_MGT_WEBHOOK_URL"
)
discord_dev_webhook_url = getattr(
    settings, "DISCORD_DEV_WEBHOOK_URL", "DISCORD_DEV_WEBHOOK_URL"
)


def format_msg(dict_content, str_msg_type):
    content = dict_content
    type = str_msg_type
    color = discord.Color
    # if type == "unexpected request" or type == "server-side validation failed":
    color = color.red()
    embed = discord.Embed(
        title=content["title"],
        url=content["url"],
        description=content["description"],
        color=color,
    )
    embed.set_author(
        name=content["name"],
        url=content["author_url"],
        icon_url=content["picture_url"],
    )
    embed.set_thumbnail(url=content["thumbnail_url"])
    embed.add_field(name="Content-Type", value=content["content_type"], inline=True)
    embed.add_field(
        name="Sec-Ch-Ua-Platform", value=content["sec-ch-ua-platform"], inline=True
    )
    embed.add_field(name="User-Agent", value=content["user_agent"], inline=False)
    embed.add_field(name="Referer", value=content["referer"], inline=False)
    embed.add_field(name="Method", value=content["method"], inline=True)
    embed.add_field(name="Full-Path", value=content["full_path"], inline=True)
    embed.add_field(name="User-Auth", value=content["user_auth"], inline=True)
    embed.set_footer(text=content["footer"])
    return embed


def get_webhook(str_channel_type):
    type = str_channel_type
    if type == "mgt":
        webhook_url = discord_mgt_webhook_url
    elif type == "dev":
        webhook_url = discord_dev_webhook_url
    webhook = Webhook.from_url(webhook_url, adapter=RequestsWebhookAdapter())
    return webhook


def send_msg(request, str_msg_type):
    type = str_msg_type
    webhook = None
    individual_content = None
    default_picture_url = "https://dongguk.film/static/d_dot_f_logo.jpg"
    if type == "unexpected request":
        webhook = get_webhook("dev")
        individual_content = {
            "picture_url": default_picture_url,
            "author_url": "",
            "title": "Unexpected Request",
            "url": "",
            "thumbnail_url": "",
            "description": "An unexpected request has occurred. The user seems to be making an unusual attempt.",
        }
    elif type == "server-side validation failed":
        webhook = get_webhook("dev")
        individual_content = {
            "picture_url": default_picture_url,
            "author_url": "",
            "title": "Server-side Validation Failed",
            "url": "",
            "thumbnail_url": "",
            "description": "Server-side validation failed. It looks like the user passed the client-side validation abnormally.",
        }
    elif type == "duplicate signup attempted":
        webhook = get_webhook("dev")
        individual_content = {
            "picture_url": default_picture_url,
            "author_url": "",
            "title": "Duplicate signup attempted",
            "url": "",
            "thumbnail_url": "",
            "description": "Duplicate signup attempted. It seems that the user entered a student id already registered in the DB.",
        }
    content = {
        "name": request.user,
        "content_type": request.content_type,
        "sec-ch-ua-platform": request.headers["sec-ch-ua-platform"],
        "user_agent": request.headers["user-agent"],
        "referer": request.headers["referer"],
        "method": request.method,
        "full_path": request.get_full_path(),
        "user_auth": request.user.is_authenticated,
        "footer": f"Occurred on {timezone.now().strftime('%Y-%m-%d %H:%M:%S')}",
    }
    content.update(individual_content)
    embed = format_msg(content, type)
    return webhook.send(embed=embed)
