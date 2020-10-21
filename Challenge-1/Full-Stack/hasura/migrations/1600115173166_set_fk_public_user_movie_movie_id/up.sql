alter table "public"."user_movie"
           add constraint "user_movie_movie_id_fkey"
           foreign key ("movie_id")
           references "public"."movie"
           ("id") on update restrict on delete restrict;
